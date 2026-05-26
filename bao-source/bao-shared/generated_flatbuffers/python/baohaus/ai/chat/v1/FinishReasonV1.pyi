from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class FinishReasonV1(object):
  NONE = cast(int, ...)
  STOP = cast(int, ...)
  LENGTH = cast(int, ...)
  TOOL_CALLS = cast(int, ...)
  CONTENT_FILTER = cast(int, ...)
  ERROR = cast(int, ...)

