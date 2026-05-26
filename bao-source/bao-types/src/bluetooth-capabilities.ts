/**
 * Bluetooth capability boundary types.
 *
 * Distinguishes BLE (Bluetooth Low Energy) from Classic Bluetooth (BR/EDR) transports
 * and profiles. The current `bluetooth-bunbuddy` implements BLE-only via `@abandonware/noble`.
 *
 * This module defines the contract so that:
 * - UI and API consumers know which profiles are available.
 * - Future classic Bluetooth support can be added without breaking the contract.
 * - The bunbuddy advertises its actual capabilities via `supportedProfiles`.
 *
 * @see infrastructure/bao-control-plane/component-inventory.yaml - component registry
 * @see bao-source/bunbuddy-shared/src/bunbuddies/bluetooth-bunbuddy/ - BLE-only implementation
 *
 * @shared/types/bluetooth-capabilities
 */

/**
 * Bluetooth transport layer.
 *
 * - `ble` - Bluetooth Low Energy (4.0+). GATT-based. Current bunbuddy implementation.
 * - `classic` - Bluetooth BR/EDR. Profile-based (SPP, A2DP, HID, etc.). Not yet implemented.
 * - `dual` - Device supports both BLE and Classic simultaneously.
 */
export type BluetoothTransport = "ble" | "classic" | "dual";

/**
 * BLE profiles/protocols supported by the bunbuddy.
 */
export type BleProfile =
  | "gatt" // Generic Attribute Profile (core BLE)
  | "gap" // Generic Access Profile (discovery)
  | "heart_rate" // Heart Rate Service
  | "battery" // Battery Service
  | "device_information" // Device Information Service
  | "environmental_sensing" // Environmental Sensing Service
  | "custom"; // Vendor-specific GATT service

/**
 * Classic Bluetooth profiles (not yet supported).
 *
 * Reserved for future implementation. The bunbuddy would need a different
 * native binding (e.g., BlueZ D-Bus on Linux, IOBluetooth on macOS).
 */
export type ClassicBluetoothProfile =
  | "spp" // Serial Port Profile
  | "a2dp" // Advanced Audio Distribution
  | "hfp" // Hands-Free Profile
  | "hid" // Human Interface Device
  | "opp" // Object Push Profile
  | "pbap" // Phone Book Access Profile
  | "avrcp"; // Audio/Video Remote Control

/**
 * Bluetooth capability declaration advertised by a bunbuddy.
 *
 * Returned in the bunbuddy's `/capabilities` response to inform the platform
 * about what transport and profiles are actually available.
 */
export interface BluetoothCapabilityDeclaration {
  /** Supported transport layer(s). */
  transports: BluetoothTransport[];

  /** BLE profiles available when transport includes 'ble'. */
  bleProfiles: BleProfile[];

  /** Classic profiles available when transport includes 'classic'. Empty for BLE-only. */
  classicProfiles: ClassicBluetoothProfile[];

  /**
   * Whether the bunbuddy requires host-level Bluetooth access.
   *
   * On Kubernetes, this typically means:
   * - `hostNetwork: true` or D-Bus socket mount for BlueZ
   * - `/dev/bus/usb` or `/dev/bluetooth` device mounts
   * - `NET_ADMIN` capability for raw HCI access
   */
  requiresHostAccess: boolean;

  /**
   * Minimum Bluetooth version supported (e.g., '4.0' for BLE, '2.1' for Classic with SSP).
   */
  minBluetoothVersion: string;
}

/**
 * Default capability declaration for the current BLE-only bunbuddy.
 */
export const BLE_ONLY_CAPABILITIES: BluetoothCapabilityDeclaration = {
  transports: ["ble"],
  bleProfiles: ["gatt", "gap"],
  classicProfiles: [],
  requiresHostAccess: true,
  minBluetoothVersion: "4.0",
};
