/**
 * Domain service definitions for module contract registration.
 *
 * Canonical source for domain services registered in the module host.
 * Used by domain-module-registration.service and mermaid diagram generators.
 *
 * @shared/architecture/domain-service-definitions
 */

import { API_PATHS } from "@baohaus/bao-constants/api-paths";
import type { CAPABILITY_CONTRACTS_V1 } from "@baohaus/bao-contracts/versions/v1/capability/registry";

const MODULE_VERSION: string = "1.0.0";

/**
 * Domain service descriptor definition.
 */
export interface DomainServiceDefinition {
  /** Unique module identifier. */
  moduleId: string;
  /** Module kind. */
  kind: string;
  /** Human-readable description. */
  description: string;
  /** Capability contract keys to resolve routes from. */
  contractKeys: ReadonlyArray<keyof typeof CAPABILITY_CONTRACTS_V1>;
  /** Additional capabilities to advertise. */
  capabilities: ReadonlyArray<{
    capabilityId: string;
    name: string;
    description: string;
    version: string;
  }>;
  /** Dependencies on other registered modules. */
  dependencies?: readonly string[];
  /** Health probe endpoint. */
  healthEndpoint: string;
}

/**
 * Domain services to register as module contracts.
 */
export const DOMAIN_SERVICE_DEFINITIONS: readonly DomainServiceDefinition[] = [
  {
    moduleId: "ai-service",
    kind: "service",
    description: "AI inference, chat, and provider integration service",
    contractKeys: ["ai", "chat", "onnx"],
    capabilities: [
      {
        capabilityId: "ai:inference",
        name: "AI Inference",
        description: "Text generation, classification, and embedding via configured providers",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "ai:chat",
        name: ".bao Chat",
        description: "Conversational .bao with tool use and streaming support",
        version: MODULE_VERSION,
      },
    ],
    healthEndpoint: `${API_PATHS.health}`,
  },
  {
    moduleId: "training-service",
    kind: "service",
    description: "Model training job orchestration and dataset management",
    contractKeys: ["training", "orchestration"],
    capabilities: [
      {
        capabilityId: "training:jobs",
        name: "Training Jobs",
        description: "Training pipeline job submission, monitoring, and artifact tracking",
        version: MODULE_VERSION,
      },
    ],
    dependencies: ["ai-service"],
    healthEndpoint: `${API_PATHS.health}`,
  },
  {
    moduleId: "hardware-service",
    kind: "hardware",
    description: "Device inventory, calibration, and hardware integration service",
    contractKeys: ["hardware", "capabilityRegistry"],
    capabilities: [
      {
        capabilityId: "hardware:devices",
        name: "Device Management",
        description: "Device discovery, inventory refresh, and capability tracking",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "hardware:calibration",
        name: "Calibration",
        description: "Device calibration profiles and validation",
        version: MODULE_VERSION,
      },
    ],
    healthEndpoint: `${API_PATHS.health}`,
  },
  {
    moduleId: "bao-control-plane-service",
    kind: "service",
    description: "OCI-native Kubernetes delivery: Package CRD, GitOps sync, BunBuddy fleet",
    contractKeys: ["fleet"],
    capabilities: [
      {
        capabilityId: "bao-control-plane:package",
        name: "Package Controller",
        description: "CRD-based package system with topological dependency resolution",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "bao-control-plane:gitops",
        name: "GitOps Sync",
        description: "Pull-based three-way apply with webhook trigger",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "bao-control-plane:fleet",
        name: "BunBuddy Fleet",
        description: "Fleet routing, capability discovery, and readiness gating",
        version: MODULE_VERSION,
      },
    ],
    healthEndpoint: `${API_PATHS.base}/health/bao-control-plane`,
  },
  {
    moduleId: "bao-install-service",
    kind: "service",
    description: "Unified .bao install orchestration with dynamic adapter registry",
    contractKeys: ["bao"],
    capabilities: [
      {
        capabilityId: "bao:install",
        name: "Bao Install",
        description: "Package and extension install orchestration via .bao archives",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "bao:adapter-registry",
        name: "Adapter Registry",
        description: "Dynamic adapter kind registration and discovery for .bao targets",
        version: MODULE_VERSION,
      },
    ],
    healthEndpoint: `${API_PATHS.health}`,
  },
  {
    moduleId: "xr-service",
    kind: "service",
    description: "Extended reality experience management and sharing",
    contractKeys: ["xr", "usd", "three"],
    capabilities: [
      {
        capabilityId: "xr:experiences",
        name: "XR Experiences",
        description: "XR session management, USD scene composition, and 3D asset handling",
        version: MODULE_VERSION,
      },
    ],
    healthEndpoint: `${API_PATHS.health}`,
  },
  {
    moduleId: "splatbao-service",
    kind: "service",
    description: "Gaussian splatting, ONNX inference, perception, and 3D model library",
    contractKeys: ["perception", "gaussian"],
    capabilities: [
      {
        capabilityId: "splatbao:onnx-inference",
        name: "ONNX Inference",
        description: "Gaussian splat model inference via ONNX runtime",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "splatbao:model-training",
        name: "Model Training",
        description: "Gaussian splatting model training and export",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "splatbao:perception",
        name: "Perception Pipeline",
        description: "Image calibration, detection, segmentation, and point cloud processing",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "splatbao:model-library",
        name: "Model Library",
        description: "Gaussian model registry, versioning, and usage tracking",
        version: MODULE_VERSION,
      },
    ],
    dependencies: ["ai-service"],
    healthEndpoint: `${API_PATHS.health}`,
  },
  {
    moduleId: "rpa-service",
    kind: "service",
    description: "Robotic process automation workflows, scheduling, and AI-assisted generation",
    contractKeys: ["rpa"],
    capabilities: [
      {
        capabilityId: "rpa:execution",
        name: "RPA Execution",
        description: "Workflow execution with keyword-driven and AI-assisted modes",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "rpa:scheduling",
        name: "RPA Scheduling",
        description: "Cron and webhook-triggered workflow scheduling",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "rpa:training",
        name: "RPA Training",
        description: "Execution-to-training data pipeline for workflow optimization",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "rpa:insights",
        name: "RPA Insights",
        description: "Execution metrics, SiuMai signal integration, and library analytics",
        version: MODULE_VERSION,
      },
    ],
    dependencies: ["ai-service"],
    healthEndpoint: `${API_PATHS.health}`,
  },
  {
    moduleId: "bao-observability",
    kind: "service",
    description: "Native observability: metrics, traces, logs, alerts",
    contractKeys: ["baoObservability"],
    capabilities: [
      {
        capabilityId: "observability:metrics",
        name: "Metrics",
        description: "SiuMaiSignal metrics query and live snapshot (OpenMetrics format)",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "observability:traces",
        name: "Traces",
        description: "Trace span query and PrismaSpanExporter",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "observability:logs",
        name: "Logs",
        description: "Structured log query with traceId/spanId",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "observability:alerts",
        name: "Alerts",
        description: "Alert rules and webhook receivers",
        version: MODULE_VERSION,
      },
    ],
    healthEndpoint: `${API_PATHS.baoObservability}/health`,
  },
  {
    moduleId: "mylittledumpling-service",
    kind: "service",
    description:
      "Coding-context retrieval: library resolution, documentation querying, and index management",
    contractKeys: ["mcp"],
    capabilities: [
      {
        capabilityId: "mld:resolve",
        name: "Library Resolution",
        description: "Resolve library names to canonical identifiers with index records",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "mld:query",
        name: "Documentation Query",
        description: "Query indexed documentation for relevant code snippets",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "mld:index",
        name: "Library Indexing",
        description: "Crawl, chunk, and index library documentation for retrieval",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "mld:context",
        name: "Context Retrieval",
        description: "RAG-powered coding context from indexed library documentation",
        version: MODULE_VERSION,
      },
      {
        capabilityId: "mld:crawl-queue",
        name: "Crawl Queue",
        description: "BaoBoss-backed background crawl queue for library documentation ingestion",
        version: MODULE_VERSION,
      },
    ],
    dependencies: ["ai-service"],
    healthEndpoint: `${API_PATHS.health}`,
  },
];
