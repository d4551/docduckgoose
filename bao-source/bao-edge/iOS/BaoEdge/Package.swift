// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "BaoEdge",
    defaultLocalization: "en",
    platforms: [.iOS(.v17), .macOS(.v14)],
    products: [
        .library(name: "BaoEdgeCore", targets: ["BaoEdgeCore"]),
        .library(name: "BaoEdgeDriver", targets: ["BaoEdgeDriver"]),
        .library(name: "BaoEdgeDriverXCTest", targets: ["BaoEdgeDriverXCTest"]),
        .library(name: "BaoEdgeUI", targets: ["BaoEdgeUI"]),
    ],
    targets: [
        .target(
            name: "BaoEdgeCore",
            plugins: ["DeviceAiProfilePlugin"]
        ),
        .target(
            name: "BaoEdgeDriver",
            dependencies: ["BaoEdgeCore"]
        ),
        .target(
            name: "BaoEdgeDriverXCTest",
            dependencies: ["BaoEdgeCore", "BaoEdgeDriver"]
        ),
        .target(
            name: "BaoEdgeUI",
            dependencies: ["BaoEdgeCore", "BaoEdgeDriver"],
            resources: [.process("Resources")]
        ),
        .testTarget(
            name: "BaoEdgeDriverTests",
            dependencies: ["BaoEdgeCore", "BaoEdgeDriver"]
        ),
        .testTarget(
            name: "BaoEdgeUITests",
            dependencies: ["BaoEdgeCore", "BaoEdgeUI"]
        ),
        .plugin(
            name: "DeviceAiProfilePlugin",
            capability: .buildTool()
        ),
    ]
)
