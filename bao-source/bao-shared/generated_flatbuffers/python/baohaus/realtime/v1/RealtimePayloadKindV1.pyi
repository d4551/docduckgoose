from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class RealtimePayloadKindV1(object):
  NONE = cast(int, ...)
  DRONE_REALTIME = cast(int, ...)
  SCANNER_PROGRESS = cast(int, ...)
  TELEMETRY_TYPED = cast(int, ...)

