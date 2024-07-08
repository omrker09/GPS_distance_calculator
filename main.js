function haversine(yourPos, target) {
  // Convert latitude and longitude from degrees to radians
  const yourLat = degreesToRadians(yourPos.lat);
  const yourLong = degreesToRadians(yourPos.long);
  let total = [];

  for (let i = 0; i < target.length; i++) {
    const targetLat = degreesToRadians(target[i].lat);
    const targetLong = degreesToRadians(target[i].long);

    // Haversine formula
    const dlat = targetLat - yourLat;
    const dlon = targetLong - yourLong;
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(yourLat) * Math.cos(targetLat) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    // Radius of Earth in kilometers
    const r = 6371.0;

    // Calculate the distance in kilometers and meters
    const distanceKm = r * c;
    const distanceMeters = distanceKm * 1000;
    const tfKm = distanceKm.toFixed(2);
    const tfMeters = distanceMeters.toFixed(0);

    total.push({
      name: target[i].name,
      kilometers: {
        distance: parseFloat(tfKm),
        per: "KM",
      },
      meters: {
        distance: parseInt(tfMeters),
        per: "M",
      },
      lat: target[i].lat,
      long: target[i].long,
    });
  }
  return total;
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function OrderByDistanceKM(data) {
  let n = data.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (data[i].kilometers.distance > data[i + 1].kilometers.distance) {
        let temp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = temp;
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  return data;
}

function OrderByRangeKM(data, range) {
    const filtred = data.filter((item) => {
        return item.kilometers.distance < range
    })
    console.log(filtred);
}

// Example usage
const yourPos = {
  lat: 36.4894,
  long: 2.8518,
};

const target = [
  {
    name: "ahmed",
    lat: 36.48622211020214,
    long: 2.7974822663319325,
  },
  {
    name: "orange cat",
    lat: 37.27276443264873,
    long: -2.658192908921187,
  },
  {
    name: "ron",
    lat: 51.56833614472594,
    long: -0.6519259251398623,
  },
  {
    name: "agent smith",
    lat: 36.511103396958625, 
    long: 2.6355607546521345,
  },
  {
    name: "person z",
    lat: 36.65817107044985, 
    long: 3.0741427657823146,
  },
];

const response = haversine(yourPos, target);
const sortedResponse = OrderByDistanceKM(response);
OrderByRangeKM(sortedResponse, 499)

