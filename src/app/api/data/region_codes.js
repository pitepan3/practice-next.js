import fs from 'fs';
import path from 'path';

// REGION_CODES.txt 파일 경로 설정
const filePath = path.join(process.cwd(), 'REGION_CODES.txt');

// 파일 읽기
const fileContent = fs.readFileSync(filePath, 'utf-8');

// 각 줄의 앞 5자리만 추출
const regionCodes = fileContent.split('\n').map(line => line.trim().slice(0, 5)).filter(Boolean);

// 중복 제거
export const REGION_CODES = [...new Set(regionCodes)];