from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class HardwareEventKindV1(object):
  StateChange = cast(int, ...)
  SensorReading = cast(int, ...)
  CommandSent = cast(int, ...)
  CommandResult = cast(int, ...)
  CalibrationUpdate = cast(int, ...)
  HealthTransition = cast(int, ...)

