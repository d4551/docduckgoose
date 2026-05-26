from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class TrainingStageV1(object):
  IDLE = cast(int, ...)
  DATA_LOADING = cast(int, ...)
  PREPROCESSING = cast(int, ...)
  TRAINING = cast(int, ...)
  VALIDATION = cast(int, ...)
  EVALUATION = cast(int, ...)
  EXPORT = cast(int, ...)
  COMPLETED = cast(int, ...)
  FAILED = cast(int, ...)
  CANCELLED = cast(int, ...)

