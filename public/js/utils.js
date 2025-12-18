function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes /= 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

function generateUUID() {
  // Create a 16-byte array
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);

  // Set the version to 4 (UUID v4)
  array[6] = (array[6] & 0x0f) | 0x40; // 0100xxxx
  // Set the variant to RFC 4122
  array[8] = (array[8] & 0x3f) | 0x80; // 10xxxxxx

  // Convert bytes to hex and format as UUID
  const hex = Array.from(array, (b) => b.toString(16).padStart(2, "0")).join(
    ""
  );

  return `${hex.substr(0, 8)}-${hex.substr(8, 4)}-${hex.substr(
    12,
    4
  )}-${hex.substr(16, 4)}-${hex.substr(20, 12)}`;
}
