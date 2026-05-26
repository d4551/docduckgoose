/**
 * Wrapture perception protocol.
 *
 * Encode/decode point cloud and mesh for perception pipelines.
 * Nx3 layout: points/vertices stored as flat float arrays.
 *
 * Performance: pooled builders for large payloads, zero-copy typed array views on decode.
 *
 * @shared/wrapture
 */

import { MeshV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/perception/v1/mesh-v1";
import { PointCloudV1 } from "@baohaus/bao-core/generated/flatbuffers/baohaus/perception/v1/point-cloud-v1";
import { withPooledBuilder, withPooledByteBuffer } from "../builder-pool";
import { WRAPTURE_BUILDER_CAPACITIES, WRAPTURE_DEFAULT_MAX_DECODE_BYTES } from "../defaults";
import { recordDecode, recordDecodeError, recordEncode, startTiming } from "../metrics";

/** FlatBuffer header overhead. */
const FB_HEADER_OVERHEAD = 256;
/** Bytes per 3D point (3 × float32). */
const BYTES_PER_POINT = 12;
/** Bytes per float32. */
const BYTES_PER_FLOAT32 = 4;
/** Components per 3D vector. */
const COMPONENTS_PER_VERTEX = 3;

/** Input for encoding a point cloud. */
export interface PointCloudEncodeInput {
  /** Number of vertices (N). */
  vertexCount: number;
  /** Flat Nx3 array: [x0,y0,z0, x1,y1,z1, ...]. */
  points: number[] | Float32Array;
}

/** Decoded point cloud. */
export interface PointCloudDecoded {
  vertexCount: number;
  points: Float32Array;
}

/** Input for encoding a mesh. */
export interface MeshEncodeInput {
  /** Number of vertices. */
  vertexCount: number;
  /** Number of triangular faces. */
  faceCount: number;
  /** Flat Nx3 array: [x0,y0,z0, ...]. */
  vertices: number[] | Float32Array;
  /** Flat Mx3 array: [i0,j0,k0, ...] indices into vertices. */
  faces: number[] | Uint32Array;
}

/** Decoded mesh. */
export interface MeshDecoded {
  vertexCount: number;
  faceCount: number;
  vertices: Float32Array;
  faces: Uint32Array;
}

/**
 * Encode a point cloud to FlatBuffers bytes.
 *
 * @param input - Point cloud data.
 * @returns Encoded bytes.
 */
export function encodePointCloud(input: PointCloudEncodeInput): Uint8Array {
  const t = startTiming();
  const minCapacity = Math.max(
    WRAPTURE_BUILDER_CAPACITIES.pointCloud,
    FB_HEADER_OVERHEAD + input.vertexCount * BYTES_PER_POINT,
  );
  const result = withPooledBuilder(minCapacity, (builder) => {
    const points = input.points instanceof Float32Array ? Array.from(input.points) : input.points;
    const pointsOffset = PointCloudV1.createPointsVector(builder, points);

    const root = PointCloudV1.createPointCloudV1(builder, input.vertexCount, pointsOffset);

    PointCloudV1.finishPointCloudV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("perception.pointcloud", result.byteLength, t);
  return result;
}

/**
 * Decode a point cloud from FlatBuffers bytes.
 *
 * Returns a zero-copy Float32Array view backed by the input buffer when possible.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded point cloud or null when invalid.
 */
export function decodePointCloud(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): PointCloudDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("perception.pointcloud");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    if (!PointCloudV1.bufferHasIdentifier(bb)) {
      return null;
    }

    const root = PointCloudV1.getRootAsPointCloudV1(bb);
    const arr = root.pointsArray();
    return {
      vertexCount: root.vertexCount(),
      points: arr ? new Float32Array(arr.buffer, arr.byteOffset, arr.length) : new Float32Array(0),
    } satisfies PointCloudDecoded;
  });

  if (!result) {
    recordDecodeError("perception.pointcloud");
    return null;
  }
  recordDecode("perception.pointcloud", uint8.byteLength, t);
  return result;
}

/**
 * Encode a mesh to FlatBuffers bytes.
 *
 * @param input - Mesh data.
 * @returns Encoded bytes.
 */
export function encodeMesh(input: MeshEncodeInput): Uint8Array {
  const t = startTiming();
  const minCapacity = Math.max(
    WRAPTURE_BUILDER_CAPACITIES.mesh,
    FB_HEADER_OVERHEAD +
      input.vertexCount * BYTES_PER_FLOAT32 * COMPONENTS_PER_VERTEX +
      input.faceCount * BYTES_PER_FLOAT32 * COMPONENTS_PER_VERTEX,
  );
  const result = withPooledBuilder(minCapacity, (builder) => {
    const vertices =
      input.vertices instanceof Float32Array ? Array.from(input.vertices) : input.vertices;
    const faces = input.faces instanceof Uint32Array ? Array.from(input.faces) : input.faces;
    const verticesOffset = MeshV1.createVerticesVector(builder, vertices);
    const facesOffset = MeshV1.createFacesVector(builder, faces);

    const root = MeshV1.createMeshV1(
      builder,
      input.vertexCount,
      input.faceCount,
      verticesOffset,
      facesOffset,
    );

    MeshV1.finishMeshV1Buffer(builder, root);
    return builder.asUint8Array().slice();
  });
  recordEncode("perception.mesh", result.byteLength, t);
  return result;
}

/**
 * Decode a mesh from FlatBuffers bytes.
 *
 * Returns zero-copy Float32Array/Uint32Array views backed by the input buffer.
 *
 * @param bytes - Encoded bytes.
 * @param maxBytes - Maximum allowed buffer size.
 * @returns Decoded mesh or null when invalid.
 */
export function decodeMesh(
  bytes: ArrayBuffer | Uint8Array,
  maxBytes: number = WRAPTURE_DEFAULT_MAX_DECODE_BYTES,
): MeshDecoded | null {
  const t = startTiming();
  const uint8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  if (uint8.byteLength > maxBytes) {
    recordDecodeError("perception.mesh");
    return null;
  }

  const result = withPooledByteBuffer(uint8, (bb) => {
    if (!MeshV1.bufferHasIdentifier(bb)) {
      return null;
    }

    const root = MeshV1.getRootAsMeshV1(bb);
    const vertArr = root.verticesArray();
    const faceArr = root.facesArray();
    return {
      vertexCount: root.vertexCount(),
      faceCount: root.faceCount(),
      vertices: vertArr
        ? new Float32Array(vertArr.buffer, vertArr.byteOffset, vertArr.length)
        : new Float32Array(0),
      faces: faceArr
        ? new Uint32Array(faceArr.buffer, faceArr.byteOffset, faceArr.length)
        : new Uint32Array(0),
    } satisfies MeshDecoded;
  });

  if (!result) {
    recordDecodeError("perception.mesh");
    return null;
  }
  recordDecode("perception.mesh", uint8.byteLength, t);
  return result;
}
