from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class StreamEventV1(object):
  TOKEN = cast(int, ...)
  METADATA = cast(int, ...)
  DONE = cast(int, ...)
  ERROR = cast(int, ...)
  TOOL_CALL = cast(int, ...)
  CITATION = cast(int, ...)

