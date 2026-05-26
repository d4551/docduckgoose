from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class BaoPermissionScope(object):
  Read = cast(int, ...)
  Write = cast(int, ...)
  Execute = cast(int, ...)
  Admin = cast(int, ...)
  Network = cast(int, ...)
  Hardware = cast(int, ...)

