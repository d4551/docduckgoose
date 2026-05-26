from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class LossTypeV1(object):
  CROSS_ENTROPY = cast(int, ...)
  MSE = cast(int, ...)
  MAE = cast(int, ...)
  CUSTOM = cast(int, ...)

