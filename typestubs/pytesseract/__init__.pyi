"""Type stubs for pytesseract."""

from typing import Any

from PIL.Image import Image
from pytesseract import pytesseract as pytesseract  # re-export the submodule

class Output:
    BYTES: int
    DICT: int
    STRING: int

class TesseractError(Exception):
    status: int
    message: str

class TesseractNotFoundError(EnvironmentError): ...
class ALTONotSupported(EnvironmentError): ...
class TSVNotSupported(EnvironmentError): ...

def image_to_string(
    image: Image | str,
    lang: str | None = ...,
    config: str = ...,
    nice: int = ...,
    output_type: int = ...,
    timeout: int = ...,
) -> str: ...

def image_to_boxes(
    image: Image | str,
    lang: str | None = ...,
    config: str = ...,
    nice: int = ...,
    output_type: int = ...,
    timeout: int = ...,
) -> str: ...

def image_to_data(
    image: Image | str,
    lang: str | None = ...,
    config: str = ...,
    nice: int = ...,
    output_type: int = ...,
    timeout: int = ...,
) -> str: ...

def image_to_osd(
    image: Image | str,
    lang: str | None = ...,
    config: str = ...,
    nice: int = ...,
    output_type: int = ...,
    timeout: int = ...,
) -> str: ...

def image_to_alto_xml(
    image: Image | str,
    lang: str | None = ...,
    config: str = ...,
    nice: int = ...,
    timeout: int = ...,
) -> bytes: ...

def image_to_pdf_or_hocr(
    image: Image | str,
    lang: str | None = ...,
    config: str = ...,
    nice: int = ...,
    extension: str = ...,
    timeout: int = ...,
) -> bytes: ...

def run_and_get_output(
    image: Image | str,
    extension: str = ...,
    lang: str | None = ...,
    config: str = ...,
    nice: int = ...,
    timeout: int = ...,
    return_bytes: bool = ...,
) -> str | bytes: ...

def run_and_get_multiple_output(
    image: Image | str,
    extensions: list[str],
    lang: str | None = ...,
    config: str = ...,
    nice: int = ...,
    timeout: int = ...,
) -> dict[str, str | bytes]: ...

def get_languages(config: str = ...) -> tuple[str, list[str]]: ...
def get_tesseract_version() -> Any: ...
