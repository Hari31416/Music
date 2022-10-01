# Music!

Create a simple app containing songs divided by artist and album. The app should have a list of artists and albums. When you click on an artist, you should see a list of albums by that artist. When you click on an album, you should see a list of songs on that album. 

Also implement search functionality. The app should use MySQL to store the data. For now, just worry with making the app work locally.

# Overview
## Routes
Here are the routes:

- `/` - Home page
- `/songs/` - List of songs
- `/artists/` - List of artists
- `/albums/` - List of albums
- `/songs/song_id/` - a page for a song
- `/artists/artist_id/` - a page for an artist
- `/albums/album_id/` - a page for an album

## Other Feautures
### Searching
Should have a search bar to search from songs, artists and playlist.
### Query-String Parameters
Should have query-string parameters for filtering.
# Steps

## Scrap the Data
Use Spotify's API and other sources. Data has to be scraped related to 
### Songs
- Song Name
- Album
- Artist(s)
- Duration
- Track Number
- Image (if available)
- Genre
- Lyrics (if available)
There should be some ID's too:
- Song ID (Primary Key)
- Album ID
- Artist ID (of the First Artist)
- Date

### Albums
- Album Name
- Artist(s)
- Date
- Number of Songs
## Create Database
There should be following tables:
- `songs`
- `artists`
- `albums`
### Songs

## Create a Homepage

## Create a Search Page