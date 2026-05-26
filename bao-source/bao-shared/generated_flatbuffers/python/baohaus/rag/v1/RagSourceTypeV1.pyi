from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class RagSourceTypeV1(object):
  ASSET = cast(int, ...)
  ANNOTATION = cast(int, ...)
  DOCUMENT = cast(int, ...)
  CONVERSATION = cast(int, ...)
  NOTE = cast(int, ...)
  MANUAL = cast(int, ...)
  LIBRARY_DOC = cast(int, ...)

