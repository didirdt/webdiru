---
title: "WgVideo"
summary: "A web-based video encoding platform that turns uploaded footage into streams that play back smoothly on any website."
year: 2025
status: shipped
tags: ["rails", "video", "ffmpeg", "streaming"]
stack: ["Ruby on Rails", "PostgreSQL", "Redis", "FFmpeg", "Video.js", "AWS Lightsail", "JavaScript", "Bootstrap"]
links:
  - { label: "Taxsam.co", href: "https://taxsam.co/" }
image: "/projects/wgvideo.webp"
cover: "/covers/wgvideo.webp"
accent: "#8b5cf6"
---

The web half of the video pipeline at Wellcode.io — the platform that takes
uploaded course footage and turns it into something a website can actually
play.

### How it works

1. Footage is uploaded and queued for encoding.
2. **FFmpeg** does the heavy work — transcoding to multiple resolutions and
   packaging them as HLS streams.
3. The resulting playlists are served to the player, and **Video.js** handles
   playback on the client.

### Why a platform rather than a script

The desktop encoder produces the same HLS output, but doing it from the web
means the pipeline scales with the team instead of with one person's
availability. It also means encoding parameters can be changed centrally
rather than by rebuilding a tool on someone's machine.

The architecture was designed to handle encoding efficiently while staying
compatible with a range of web applications — the same encoded output is
reused across different front ends instead of being produced per site.

### Background

**Ruby on Rails** · **PostgreSQL** · **Redis** · **FFmpeg** · **Video.js** ·
**AWS Lightsail** · **JavaScript** · **Bootstrap**
