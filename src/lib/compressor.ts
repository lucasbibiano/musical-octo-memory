export async function compressAndEncode(inputString: string) {
  const encoder = new TextEncoder();

  // Create a ReadableStream from the input string
  const inputReadableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(inputString));
      controller.close();
    },
  });

  // Compress the ReadableStream using the gzip algorithm
  const compressedStream = inputReadableStream.pipeThrough(
    new CompressionStream("gzip")
  );

  // Read the compressed data from the stream
  const reader = compressedStream.getReader();

  let compressedData = new Uint8Array();
  let result;

  while ((result = await reader.read())) {
    if (result.done) {
      // Encode the compressed data as a URI component
      const encodedData = encodeURIComponent(
        btoa(String.fromCharCode(...compressedData))
      );

      return encodedData;
    } else {
      compressedData = new Uint8Array([...compressedData, ...result.value]);
    }
  }
}

export async function decompressAndDecode(encodedString: string) {
  const decoder = new TextDecoder();

  // Decode the URI-encoded compressed data
  const decodedData = atob(decodeURIComponent(encodedString));

  // Convert the decoded data to a Uint8Array
  const compressedData = new Uint8Array(
    decodedData.split("").map((c) => c.charCodeAt(0))
  );

  // Create a ReadableStream from the compressed data
  const compressedStream = new ReadableStream({
    start(controller) {
      controller.enqueue(compressedData);
      controller.close();
    },
  });

  // Decompress the ReadableStream using the gzip algorithm
  const decompressedStream = compressedStream.pipeThrough(
    new DecompressionStream("gzip")
  );

  // Read the decompressed data from the stream
  const reader = decompressedStream.getReader();

  let decompressedData = "";
  let result;

  while ((result = await reader.read())) {
    if (result.done) {
      return decompressedData;
    } else {
      decompressedData += decoder.decode(result.value);
    }
  }
}
