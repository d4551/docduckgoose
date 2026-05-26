from __future__ import annotations

import flatbuffers
import numpy as np

import typing
from typing import cast

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class AiProviderV1(object):
  UNKNOWN = cast(int, ...)
  OPENAI = cast(int, ...)
  ANTHROPIC = cast(int, ...)
  OLLAMA = cast(int, ...)
  ONNX_LOCAL = cast(int, ...)
  CUSTOM = cast(int, ...)

