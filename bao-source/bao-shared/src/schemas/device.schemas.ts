/**
 * Device and Hardware Schemas
 *
 * Defines type-safe models for medical imaging devices, hardware peripherals,
 * and connection management. These schemas ensure consistent device handling
 * across the Baohaus platform.
 *
 * @shared/schemas/device.ts
 *
 * @remarks
 * This module is used primarily for type guards and documentation.
 * Runtime validation for API requests and responses is handled by Elysia route schemas.
 * Device types include cameras, microscopes, scanners, and various medical imaging
 * hardware peripherals.
 *
 * @example
 * ```typescript
 * import { Device, DEVICE_TYPES, DeviceStatusType } from '@baohaus/bao-schemas/device.ts';
 *
 * const camera: Device = {
 *   id: '550e8400-e29b-41d4-a716-446655440000',
 *   name: 'Basler Camera 1',
 *   type: 'camera',
 *   status: 'connected',
 *   connected: true,
 *   identifier: {
 *     serialNumber: 'BCM123456',
 *     vendorId: '0x2a00',
 *     productId: '0x0001'
 *   }
 * };
 * ```
 */

/**
 * Canonical audio device type list.
 */
export const AUDIO_DEVICE_TYPES: readonly ["microphone", "speaker", "headset"] = [
  "microphone",
  "speaker",
  "headset",
] as const;

/**
 * Type-safe audio device type enumeration.
 */
export type AudioDeviceType = (typeof AUDIO_DEVICE_TYPES)[number];

/**
 * Supported device types in the Baohaus platform.
 *
 * Defines all supported hardware device categories:
 * - camera: Digital imaging cameras
 * - depth-camera: Depth sensing cameras (LiDAR/ToF/stereo)
 * - tracking-camera: Inside-out tracking cameras for XR
 * - xr-headset: VR/AR head-mounted devices
 * - basler: Basler/Pylon camera integrations
 * - csi: CSI/embedded camera modules
 * - microscope: Digital microscopes and slide scanners
 * - scanner: Document and slide scanners
 * - 3d-scanner: 3D scanning devices
 * - turntable: 3D scan turntables
 * - imager: General imaging devices
 * - sensor: Environmental and diagnostic sensors
 * - controller: Hardware control devices
 * - microphone: Audio input devices
 * - speaker: Audio output devices
 * - headset: Combined audio input/output devices
 * - lighting: LED lighting controllers
 * - footpedal: Foot pedal input devices
 * - usb: Generic USB devices
 * - serial: Serial port devices
 * - network: Network-connected devices
 * - ble: Bluetooth Low Energy devices
 * - hid: Human Interface Devices (raw HID class)
 * - printer: Thermal/receipt printers (ESC/POS)
 * - barcode-scanner: Barcode and QR code scanners
 * - environmental-sensor: Environmental sensors (temperature, humidity, air quality)
 * - modbus-device: Modbus RTU/TCP industrial devices
 * - drone: Generic UAV/vehicle devices
 * - quadcopter/hexacopter/octocopter: Multirotor drones
 * - fixed-wing: Fixed-wing UAVs
 * - rc-car: RC ground vehicles
 * - ground-rover: Ground rover vehicles
 * - robot: Robotics devices (robot arms, cobots, mobile robots)
 * - other: Uncategorized devices
 */
export const DEVICE_TYPES: readonly [
  "camera",
  "depth-camera",
  "tracking-camera",
  "xr-headset",
  "basler",
  "csi",
  "microscope",
  "scanner",
  "3d-scanner",
  "turntable",
  "imager",
  "sensor",
  "controller",
  "microphone",
  "speaker",
  "headset",
  "lighting",
  "footpedal",
  "usb",
  "serial",
  "network",
  "ble",
  "hid",
  "printer",
  "barcode-scanner",
  "environmental-sensor",
  "modbus-device",
  "drone",
  "quadcopter",
  "hexacopter",
  "octocopter",
  "fixed-wing",
  "rc-car",
  "ground-rover",
  "robot",
  "other",
] = [
  "camera",
  "depth-camera",
  "tracking-camera",
  "xr-headset",
  "basler",
  "csi",
  "microscope",
  "scanner",
  "3d-scanner",
  "turntable",
  "imager",
  "sensor",
  "controller",
  ...AUDIO_DEVICE_TYPES,
  "lighting",
  "footpedal",
  "usb",
  "serial",
  "network",
  "ble",
  "hid",
  "printer",
  "barcode-scanner",
  "environmental-sensor",
  "modbus-device",
  "drone",
  "quadcopter",
  "hexacopter",
  "octocopter",
  "fixed-wing",
  "rc-car",
  "ground-rover",
  "robot",
  "other",
] as const;

/**
 * Type-safe device type enumeration.
 */
export type DeviceTypeType = (typeof DEVICE_TYPES)[number];

/**
 * Valid device connection and operational statuses.
 *
 * Defines device lifecycle and connection states:
 * - online: Device is connected and operational
 * - offline: Device is not reachable
 * - error: Device encountered an error
 * - initializing: Device is starting up
 * - disconnected: Device connection was terminated
 * - detected: Device was discovered but not connected
 * - connected: Device is connected but not ready
 * - standby: Device is connected in low-power mode
 * - ready: Device is fully operational
 * - calibrating: Device is undergoing calibration
 * - calibrated: Device calibration is complete
 * - uncalibrated: Device requires calibration
 * - degraded: Device is operational with reduced functionality
 * - unknown: Device status cannot be determined
 */
export const DEVICE_STATUSES: readonly [
  "online",
  "offline",
  "error",
  "initializing",
  "disconnected",
  "detected",
  "connected",
  "standby",
  "ready",
  "calibrating",
  "calibrated",
  "uncalibrated",
  "degraded",
  "unknown",
] = [
  "online",
  "offline",
  "error",
  "initializing",
  "disconnected",
  "detected",
  "connected",
  "standby",
  "ready",
  "calibrating",
  "calibrated",
  "uncalibrated",
  "degraded",
  "unknown",
] as const;

/**
 * Type-safe device status enumeration.
 */
export type DeviceStatusType = (typeof DEVICE_STATUSES)[number];

/**
 * Device driver installation statuses.
 *
 * Tracks driver installation and update states:
 * - unknown: Driver status cannot be determined
 * - pending: Driver installation is queued
 * - installing: Driver is currently being installed
 * - installed: Driver is successfully installed
 * - failed: Driver installation failed
 * - outdated: Driver needs updating
 */
export const DRIVER_STATUSES: readonly [
  "unknown",
  "pending",
  "installing",
  "installed",
  "failed",
  "outdated",
] = ["unknown", "pending", "installing", "installed", "failed", "outdated"] as const;

/**
 * Type-safe driver status enumeration.
 */
export type DriverStatusType = (typeof DRIVER_STATUSES)[number];

/**
 * Supported device connection types.
 *
 * Physical and logical connection methods:
 * - usb: USB wired connection
 * - serial: RS-232/RS-485 serial connection
 * - network: TCP/IP network connection
 * - bluetooth: Bluetooth wireless connection
 * - wifi: Wi-Fi wireless connection
 * - ethernet: Ethernet wired connection
 */
export const CONNECTION_TYPES: readonly [
  "usb",
  "serial",
  "network",
  "bluetooth",
  "wifi",
  "ethernet",
] = ["usb", "serial", "network", "bluetooth", "wifi", "ethernet"] as const;

/**
 * Type-safe connection type enumeration.
 */
export type ConnectionTypeType = (typeof CONNECTION_TYPES)[number];

/**
 * Supported camera interface standards.
 *
 * Camera communication protocols and interfaces:
 * - genicam: GenICam standard for machine vision cameras
 * - v4l2: Video4Linux2 for Linux systems
 * - directshow: DirectShow for Windows systems
 * - avfoundation: AVFoundation for macOS/iOS systems
 * - csi: Camera Serial Interface for embedded systems
 * - onvif: ONVIF standard for network video devices
 */
export const CAMERA_INTERFACES: readonly [
  "genicam",
  "v4l2",
  "directshow",
  "avfoundation",
  "csi",
  "onvif",
] = ["genicam", "v4l2", "directshow", "avfoundation", "csi", "onvif"] as const;

/**
 * Type-safe camera interface enumeration.
 */
export type CameraInterfaceType = (typeof CAMERA_INTERFACES)[number];

/**
 * Device hardware identification information
 *
 * DeviceIdentifier
 *
 * @description
 * Contains unique identifiers used to recognize and track hardware devices.
 * Used for device registration, inventory management, and hardware tracking.
 *
 * @example
 * ```typescript
 * const identifier: DeviceIdentifier = {
 *   serialNumber: 'BCM123456',
 *   vendorId: '0x2a00',
 *   productId: '0x0001',
 *   macAddress: '00:1A:2B:3C:4D:5E'
 * };
 * ```
 */
export interface DeviceIdentifier {
  /** Manufacturer serial number */
  serialNumber?: string;
  /** USB vendor ID (hexadecimal format) */
  vendorId?: string;
  /** USB product ID (hexadecimal format) */
  productId?: string;
  /** Network MAC address for network devices */
  macAddress?: string;
  /** Network IP address for network devices */
  ipAddress?: string;
  /** Hostname or network label for the device */
  hostname?: string;
  /** URN or discovery identifier for network devices */
  urn?: string;
}

/**
 * Complete device entity
 *
 * Device
 *
 * @description
 * Represents a hardware device in the Baohaus platform. This is a
 * flexible interface that can represent cameras, microscopes, scanners,
 * and other medical imaging peripherals. Additional device-specific
 * properties can be added via the index signature.
 *
 * @example
 * ```typescript
 * const camera: Device = {
 *   id: '550e8400-e29b-41d4-a716-446655440000',
 *   name: 'Basler acA1920-40gm',
 *   type: 'camera',
 *   status: 'ready',
 *   connected: true,
 *   identifier: {
 *     serialNumber: 'BCM123456',
 *     vendorId: '0x2a00'
 *   },
 *   // Device-specific properties
 *   resolution: { width: 1920, height: 1200 },
 *   frameRate: 40
 * };
 * ```
 */
export interface Device {
  /** Unique device identifier (UUID) */
  id?: string;
  /** Human-readable device name */
  name?: string;
  /** Device category/type */
  type?: DeviceTypeType;
  /** Current operational status */
  status?: DeviceStatusType;
  /** Whether device is currently connected */
  connected?: boolean;
  /** Hardware identification information */
  identifier?: DeviceIdentifier;
  /** Additional device-specific properties */
  extraProperties?: Record<string, unknown>;
}
