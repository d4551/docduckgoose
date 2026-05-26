from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class DependencyStatusV1(object):
  UNRESOLVED = cast(int, ...)
  RESOLVED = cast(int, ...)
  CONFLICT = cast(int, ...)
  MISSING = cast(int, ...)
  CIRCULAR = cast(int, ...)

