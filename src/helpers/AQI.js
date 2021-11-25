function aqiGradeRGB(current) {
  if (current === undefined) {
    return 'No-Data';
  } else if (current >= 0 && current <= 50) {
    return 'Satisfactory';
  } else if (current > 50 && current <= 100) {
    return 'Acceptable';
  } else if (current > 100 && current <= 150) {
    return 'Poor';
  } else if (current > 150 && current <= 200) {
    return 'Very-Poor';
  } else if (current > 200 && current <= 300) {
    return 'Health-Alert';
  } else if (current > 300) {
    return 'Health-Warning';
  }
}

export default aqiGradeRGB;
