from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class BaoDownRunEventKindV1(object):
  RUN_STARTED = cast(int, ...)
  RUN_COMPLETED = cast(int, ...)
  RUN_FAILED = cast(int, ...)
  RUN_CANCELLED = cast(int, ...)
  NODE_STARTED = cast(int, ...)
  NODE_COMPLETED = cast(int, ...)
  NODE_FAILED = cast(int, ...)
  NODE_LOG = cast(int, ...)

