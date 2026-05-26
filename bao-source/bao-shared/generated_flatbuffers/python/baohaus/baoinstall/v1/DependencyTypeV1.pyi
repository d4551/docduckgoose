from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class DependencyTypeV1(object):
  REQUIRED = cast(int, ...)
  OPTIONAL = cast(int, ...)
  PEER = cast(int, ...)
  DEV = cast(int, ...)

