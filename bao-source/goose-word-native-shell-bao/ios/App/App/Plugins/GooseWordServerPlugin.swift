import Foundation
import Capacitor

@objc(GooseWordServerPlugin)
public class GooseWordServerPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "GooseWordServerPlugin"
    public let jsName = "GooseWordServer"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "detect", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getStatus", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "injectDeviceContext", returnType: CAPPluginReturnPromise),
    ]

    @objc func detect(_ call: CAPPluginCall) {
        call.resolve(["platform": "ios"])
    }

    @objc func start(_ call: CAPPluginCall) {
        let port = UInt16(call.getInt("port") ?? 8080)
        let dataDir = call.getString("dataDir") ?? NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first ?? ""
        let started = GooseWordLoopbackHost.shared.start(port: port, dataDir: dataDir + "/goose-word")
        call.resolve([
            "running": started,
            "loopbackUrl": "http://127.0.0.1:\(port)",
            "platform": "ios",
        ])
    }

    @objc func stop(_ call: CAPPluginCall) {
        GooseWordLoopbackHost.shared.stop()
        call.resolve(["stopped": true])
    }

    @objc func getStatus(_ call: CAPPluginCall) {
        let port = GooseWordLoopbackHost.shared.port
        call.resolve([
            "running": true,
            "loopbackUrl": "http://127.0.0.1:\(port)",
            "platform": "ios",
        ])
    }

    @objc func injectDeviceContext(_ call: CAPPluginCall) {
        call.resolve(["ok": true])
    }
}
