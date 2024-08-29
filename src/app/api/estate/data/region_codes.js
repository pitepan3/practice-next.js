import fs from 'fs';
import path from 'path';

// REGION_CODES.txt 파일 경로 설정
const filePath = path.join(process.cwd(), 'REGION_CODES.txt');

// 파일 읽기
const fileContent = fs.readFileSync(filePath, 'utf-8');

// 각 줄에서 앞 5자리 코드와 중심 좌표 추출
const regionData = fileContent.split('\n').map(line => {
  const trimmedLine = line.trim();
  
  // 줄이 비어있지 않은 경우만 처리
  if (trimmedLine) {
    const code = trimmedLine.slice(0, 5); // 앞 5자리 법정동코드 추출
    const coords = trimmedLine.slice(trimmedLine.lastIndexOf('\t') + 1); // 중심 좌표 추출

    return { code, coords };
  }
}).filter(Boolean); // 빈 값 제거

// REGION_CODES 배열
const REGION_CODES = [...new Set(regionData.map(data => data.code))];

// 각 REGION_CODES와 일치하는 COORDINATES 배열
const CETNER_COORDINATE = regionData.reduce((acc, data) => {
  if (!acc[data.code]) {
    acc[data.code] = [];
  }
  acc[data.code].push(data.coords);
  return acc;
}, {});


// REGION_CODES와 CETNER_COORDINATE 내보내기
export { REGION_CODES, CETNER_COORDINATE };
