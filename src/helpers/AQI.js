function aqiGradeRGB(current) {
  if (current === undefined) {
    return 'No-Data';
  } else if (current >= 0 && current <= 50) {
    return ['Satisfactory', 0, 50];
  } else if (current > 50 && current <= 100) {
    return ['Acceptable', 51, 100];
  } else if (current > 100 && current <= 150) {
    return ['Poor', 101, 150];
  } else if (current > 150 && current <= 200) {
    return ['Very-Poor', 151, 200];
  } else if (current > 200 && current <= 300) {
    return ['Health-Alert', 201, 300];
  } else if (current > 300) {
    return ['Health-Warning', 301, '∞'];
  }
}

export default aqiGradeRGB;
