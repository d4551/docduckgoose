from __future__ import annotations

import flatbuffers
import numpy as np

import typing

uoffset: typing.TypeAlias = flatbuffers.number_types.UOffsetTFlags.py_type

class Attitude(object):
  @classmethod
  def SizeOf(cls) -> int: ...

  def Init(self, buf: bytes, pos: int) -> None: ...
  def Roll(self) -> float: ...
  def Pitch(self) -> float: ...
  def Yaw(self) -> float: ...

def CreateAttitude(builder: flatbuffers.Builder, roll: float, pitch: float, yaw: float) -> uoffset: ...

