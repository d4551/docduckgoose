from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class RagMatchStrategyV1(object):
  VECTOR = cast(int, ...)
  KEYWORD = cast(int, ...)
  DETERMINISTIC = cast(int, ...)
  MCP = cast(int, ...)

