export function capitalizeFirstLetter(string: string): string {
  return string?.length ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}

export function formatTemperature(value: number) {
  return `${value.toFixed()}°`
}

export function getWindDirection(degrees: number) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.floor(Math.round(degrees % 360) / 45)];
}