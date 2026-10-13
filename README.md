# Charlie Locep — Video Editor Portfolio

Static site (HTML, CSS, vanilla JS). No build step, no backend. Works locally and on GitHub Pages.

## 1. Add your assets

Use these exact names (or change the paths in `CONFIG` at the top of `script.js`).

| File | Used for |
|---|---|
| `assets/images/hero-visual.jpg` | Hero image (16:10 works best) |
| `assets/images/youtube-channel.png` | Clickable YouTube channel image |
| `assets/images/software-01.png` … `03.png` | Software logos (transparent PNG OK) |
| `assets/images/workspace.jpg` | Workspace photo |
| `assets/images/premiere-timeline.png` | Premiere Pro timeline screenshot |
| `assets/images/longform-poster.jpg` | Long-form video poster |
| `assets/images/shortform-01.jpg` … `09.jpg` | Thumbnail for each short-form card (9:16) |
| `assets/videos/shortform/shortform-01.mp4` … `09.mp4` | 9:16 vertical videos |
| `assets/videos/longform/longform-01.mp4` | 16:9 long-form video |

Short-form card thumbnails: add `assets/images/shortform-01.jpg` … `shortform-09.jpg` (9:16 images, one per reel). Each card shows its image behind the play button. A card without its image shows a striped placeholder with the filename to add. Paths can be changed per card in `CONFIG.shortForm`.

Missing files never break the layout; a labeled placeholder is shown instead.

## 2. Configure everything in `script.js`

All editable values are in the `CONFIG` block at the top.

- **Software names:** `CONFIG.software[].name`
- **Workspace text:** `CONFIG.workspace.intro` and `.features` (currently placeholders; no specs are invented)
- **Short-form titles:** `CONFIG.shortForm`
- **YouTube:** `CONFIG.youtube.url` (must start with `https://www.youtube.com/` or `https://youtu.be/`) and optional `channelName`
- **Discord:** `CONFIG.contact.discordUrl`. A username alone does not make a DM link. Use a profile link like `https://discord.com/users/YOUR_USER_ID` (turn on Developer Mode in Discord, right-click your profile, Copy User ID) or a server invite link.
- **Email:** `CONFIG.contact.email`. Opens the visitor's mail app with the subject "Video Editing Project Inquiry".
- **WhatsApp:** `CONFIG.contact.whatsappNumber`, international format, digits only (e.g. `639171234567`). It builds `https://wa.me/639171234567`.
- **Official logos:** the built-in icons are simple stand-ins. Download the official logos from each brand's press/brand page, place them in `assets/images/`, and set `CONFIG.contact.logos`.

Until a contact or channel value is configured, its card is shown as disabled with a "Not set up yet" note, so no link points to an invalid address.

## 3. Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit `http://localhost:8000`.

## 4. Publish with GitHub Pages

1. Create a repository on GitHub (e.g. `charlie-locep-portfolio`).
2. Upload all files and the `assets` folder (drag and drop on GitHub, or use git).
3. With git:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/charlie-locep-portfolio.git
   git push -u origin main
   ```
4. In the repo, open **Settings → Pages**.
5. Under **Build and deployment**, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
6. Wait a minute or two. The URL appears at the top of the Pages screen: `https://YOUR-USERNAME.github.io/charlie-locep-portfolio/`.
7. To update the site later: replace or add files, commit, and push. Pages redeploys automatically. Hard-refresh (Ctrl/Cmd+Shift+R) if you still see old media.

All paths are relative, so the project subpath works without changes.

## 5. Video hosting and size limits

Local MP4 playback is the default. GitHub has limits to keep in mind (verify the current numbers in GitHub's docs): files over 50 MB trigger warnings, files over 100 MB are blocked from normal pushes, and Pages sites have size and bandwidth limits.

- Compress videos (H.264 MP4, around 720×1280 for vertical clips) so small files can be committed directly.
- For large videos, host them elsewhere (cloud storage or a video host that gives a direct `.mp4` URL) and put the full `https://...` URL in the `src` field of `CONFIG.shortForm` or `CONFIG.longForm`. No redesign is needed.
- Git LFS does not serve video files through GitHub Pages, so it is not a fix for hosting.
- Page embeds from YouTube or Vimeo use iframes rather than `<video>`. This project plays direct MP4 files, or Google Drive links through the Drive player.

## 6. Using Google Drive for videos

Paste your Drive links into `DRIVE_SHORT` (9 links, in order) and `DRIVE_LONG` at the top of `script.js`.

1. In Google Drive, right-click the video, choose **Share**.
2. Under **General access**, choose **Anyone with the link** (Viewer).
3. Click **Copy link** and paste it between the quotes. Any Drive link format is accepted.

Drive videos play inside Google's embedded player (a direct link cannot feed the site's own `<video>` player, because Drive blocks that). Notes:
- Freshly uploaded videos may take a few minutes to finish processing on Google's side.
- If a video says it can't be played, check the sharing setting. Heavy traffic on one file can also trigger a temporary Google view limit.
- Leave a link as `""` to use the local MP4 in `assets/videos/` for that slot instead.
- The posters (`shortform-XX` and `longform-poster` images) are still uploaded to the repo as before.

## Features

Fixed nav with active-section highlight and keyboard-friendly mobile menu; native `<dialog>` modals (focus handling, Escape to close, background scroll locked, playback stopped on close); videos load only when opened (`preload="none"`); lazy images; reduced-motion support.
