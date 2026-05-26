import Foundation
import Network
import SQLite3

/// In-process loopback host for iOS (platform boundary; allowlisted native HTTP + SQLite).
final class GooseWordLoopbackHost {
    static let shared = GooseWordLoopbackHost()
    private var listener: NWListener?
    private(set) var port: UInt16 = 8080
    private let queue = DispatchQueue(label: "com.baohaus.gooseword.loopback")

    func start(port: UInt16, dataDir: String) -> Bool {
        self.port = port
        let params = NWParameters.tcp
        params.allowLocalEndpointReuse = true
        guard let listener = try? NWListener(using: params, on: NWEndpoint.Port(rawValue: port)!) else {
            return false
        }
        self.listener = listener
        listener.newConnectionHandler = { connection in
            connection.start(queue: self.queue)
            self.handle(connection: connection, dataDir: dataDir)
        }
        listener.start(queue: queue)
        return true
    }

    func stop() {
        listener?.cancel()
        listener = nil
    }

    private func handle(connection: NWConnection, dataDir: String) {
        connection.receive(minimumIncompleteLength: 1, maximumLength: 65536) { data, _, _, _ in
            guard let data, let request = String(data: data, encoding: .utf8) else {
                connection.cancel()
                return
            }
            let response = self.route(request: request, dataDir: dataDir)
            let payload = response.data(using: .utf8) ?? Data()
            connection.send(content: payload, completion: .contentProcessed { _ in
                connection.cancel()
            })
        }
    }

    private func route(request: String, dataDir: String) -> String {
        let firstLine = request.split(separator: "\n", maxSplits: 1, omittingEmptySubsequences: false).first ?? ""
        if firstLine.contains("GET /api/health") {
            return httpJson(status: 200, body: "{\"ok\":true,\"mode\":\"ios-embedded\"}")
        }
        if firstLine.contains("POST /api/docs") {
            let id = UUID().uuidString
            GooseWordDocStore.shared.createDoc(dataDir: dataDir, id: id, title: "Untitled", body: "")
            return httpJson(status: 200, body: "{\"id\":\"\(id)\"}")
        }
        if firstLine.contains("GET /docs") {
            return httpHtml(status: 200, body: "<!doctype html><html><body><p>Goose Word iOS shell</p></body></html>")
        }
        return httpPlain(status: 404, body: "Not Found")
    }

    private func httpJson(status: Int, body: String) -> String {
        return "HTTP/1.1 \(status) OK\r\nContent-Type: application/json\r\nContent-Length: \(body.utf8.count)\r\nConnection: close\r\n\r\n\(body)"
    }

    private func httpHtml(status: Int, body: String) -> String {
        return "HTTP/1.1 \(status) OK\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: \(body.utf8.count)\r\nConnection: close\r\n\r\n\(body)"
    }

    private func httpPlain(status: Int, body: String) -> String {
        return "HTTP/1.1 \(status) OK\r\nContent-Type: text/plain\r\nContent-Length: \(body.utf8.count)\r\nConnection: close\r\n\r\n\(body)"
    }
}

final class GooseWordDocStore {
    static let shared = GooseWordDocStore()

    func createDoc(dataDir: String, id: String, title: String, body: String) {
        let root = URL(fileURLWithPath: dataDir, isDirectory: true)
        let dbPath = root.appendingPathComponent("docs.db").path
        var db: OpaquePointer?
        sqlite3_open(dbPath, &db)
        if db == nil {
            return
        }
        let sql = "CREATE TABLE IF NOT EXISTS docs (id TEXT PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL DEFAULT '', slug TEXT NOT NULL, updated_at TEXT NOT NULL, file_path TEXT NOT NULL);"
        sqlite3_exec(db, sql, nil, nil, nil)
        let insert = "INSERT INTO docs (id, title, body, slug, updated_at, file_path) VALUES (?, ?, ?, ?, datetime('now'), ?);"
        var stmt: OpaquePointer?
        sqlite3_prepare_v2(db, insert, -1, &stmt, nil)
        sqlite3_bind_text(stmt, 1, id, -1, nil)
        sqlite3_bind_text(stmt, 2, title, -1, nil)
        sqlite3_bind_text(stmt, 3, body, -1, nil)
        sqlite3_bind_text(stmt, 4, id, -1, nil)
        sqlite3_bind_text(stmt, 5, "\(dataDir)/\(id).md", -1, nil)
        sqlite3_step(stmt)
        sqlite3_finalize(stmt)
        sqlite3_close(db)
    }
}
