from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class TensorTypeV1(object):
  FLOAT32 = cast(int, ...)
  FLOAT16 = cast(int, ...)
  INT32 = cast(int, ...)
  INT64 = cast(int, ...)
  UINT8 = cast(int, ...)
  BOOL = cast(int, ...)
  STRING = cast(int, ...)

