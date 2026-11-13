---
title: "Taxsam Video Encoder"
summary: "A Windows desktop tool that transcodes source video into multi-resolution HLS streams, compresses them, and deploys them to the streaming site."
year: 2026
status: shipped
tags: ["csharp", "ffmpeg", "desktop", "video"]
stack: ["C#", ".NET 8", "Windows Forms", "FFmpeg", "HLS", "AES"]
cover: "/covers/taxsam-video-encoder.webp"
image: "/projects/taxsam-video-encoder.webp"
links:
  - { label: "Streaming site", href: "https://learning.taxsam.co/" }
  - { label: "Client", href: "https://taxsam.co/" }
accent: "#f59e0b"
---

A desktop encoder for **Taxsam Learning Center** — the streaming site where
Indonesia's tax experts publish their video courses. Encoding was the manual
step that nobody wanted: same settings every time, many resolutions to produce,
and a pile of files to upload afterwards.

### The pipeline

Pick a source file (`mp4`, `mov`, `mkv`), tick the resolutions you want, and
press start:

1. **FFmpeg** transcodes the source into each resolution — 842×480, 1280×720,
   and 1920×1080 — at its own bitrate (1.4 / 2.5 / 4.5 Mbps).
2. Each rendition becomes an **HLS** stream: segmented `.m3u8` chunks plus a
   variant playlist, all linked from a master playlist with
   `#EXT-X-STREAM-INF` carrying the bandwidth and resolution for that rung.
3. The whole set is packed into a `.tar`, gzipped to `.tar.gz`, and **encrypted**
   with AES (PBKDF2-SHA256) before it leaves the machine.
4. The encrypted bundle is deployed to `learning.taxsam.co/streams`, where the
   player picks the right quality for the viewer's connection.

The output file extension is `.wg-video` — an encrypted archive, not a video.

### Why a desktop app

The encoder is run by someone with the source footage on their machine, often
on a slow connection. Doing it locally means:

- **FFmpeg ships with the app.** No dependency on the operator having the
  right version installed.
- **Progress, cancellation, and a clear status line** — the previous process
  was a black box that either worked or didn't.
- **Encryption before upload**, so nothing sensitive sits on the server in the
  clear, even briefly.

### Details that took the time

FFmpeg's `hls_base_url` and `hls_segment_filename` options are what make the
master playlist point at the right URLs once the files land on the server.
Getting the naming convention of the segment files to match the deployment
path — and to survive the round trip through `tar` — was the fiddliest part of
the whole thing.

### Stack

C# · .NET 8 · Windows Forms · FFmpeg · HLS · AES-256 · SharpCompress
