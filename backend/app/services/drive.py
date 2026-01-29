import shutil
from pathlib import Path
from fastapi import UploadFile
import uuid

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

class DriveService:
    @staticmethod
    async def upload_file(file: UploadFile) -> str:
        """
        Simulates upload to Google Drive.
        Returns a local URL or mock Drive ID.
        """
        file_ext = file.filename.split('.')[-1]
        file_id = f"{uuid.uuid4()}.{file_ext}"
        file_path = UPLOAD_DIR / file_id
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # simulating a drive link
        return f"https://drive.google.com/file/d/mock-{file_id}/view"

drive_service = DriveService()
