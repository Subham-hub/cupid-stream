import { Grid, MenuItem } from "@mui/material";
import TagsInput from "./TagsInput";
import { Fragment, useCallback, useEffect, useState } from "react";
import Textarea from "../../../shared/UIElements/TextArea/TextArea";
import { DatePicker, Input, Select } from "../../../shared/UIElements";
import { countryArr } from "../../../shared/constants/countries";
import languages from "../../../shared/constants/languages";
import TimePicker from "../../../shared/UIElements/TimePicker/TimePicker";
import ThumbnailUploader from "./ThumbnailUploader";
import { ageRatingsArr } from "../../../shared/constants/age-ratings";
import { privacySettingsArr } from "../../../shared/constants/privacy-settings";
import { genresArray } from "../../../shared/utils/genresArray";

const MovieUploaderFields = ({
  register,
  onSendExtraData,
  isSubmitted,
  hookErrors,
  page1,
}) => {
  const [cast, setCast] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [runtime, setRuntime] = useState();
  const [language, setLanguage] = useState();
  const [country, setCountry] = useState();
  const [ageRating, setAgeRating] = useState();
  const [privacySetting, setPrivacySetting] = useState();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (
      page1 &&
      releaseDate &&
      runtime &&
      language &&
      ageRating &&
      country &&
      privacySetting
    )
      onSendExtraData({
        releaseDate,
        runtime,
        language,
        ageRating,
        country,
        privacySetting,
      });
    if (!page1 && thumbnail && cast && genres)
      onSendExtraData({ thumbnail, cast, genres });
  }, [
    cast,
    thumbnail,
    releaseDate,
    runtime,
    onSendExtraData,
    page1,
    language,
    ageRating,
    country,
    privacySetting,
    genres,
  ]);

  const onSendGenreValues = useCallback((data) => {
    let newArr = [];
    for (let i = 0; i < data.length; i++) {
      newArr.push(genresArray.find((g) => g.name === data[i]));
    }
    setGenres(newArr);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {page1 && (
          <Fragment>
            <Grid item xs={12}>
              <Input
                fullWidth
                label="Title"
                name="title"
                register={register}
                validation={{ required: "Title is required" }}
                error={hookErrors.title && hookErrors.title.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Textarea
                minRows={4}
                placeholder="Description"
                name="description"
                register={register}
                style={{ width: "97%", resize: "vertical" }}
                validation={{ required: "Description is required" }}
                error={hookErrors.description && hookErrors.description.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                fullWidth
                label="Language"
                onSendValue={(v) => setLanguage(v)}
                error={
                  isSubmitted.in === "page1" &&
                  !language &&
                  "Language is required"
                }
              >
                {languages.map((l) => (
                  <MenuItem key={l.code} value={l.name}>
                    {l.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                onSendValue={(v) => setCountry(v)}
                fullWidth
                label="Country"
                error={
                  isSubmitted.in === "page1" &&
                  !country &&
                  "Country is required"
                }
              >
                {countryArr.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                onSendValue={(v) => setAgeRating(v)}
                fullWidth
                label="Age Rating"
                error={
                  isSubmitted.in === "page1" &&
                  !ageRating &&
                  "Country is required"
                }
              >
                {ageRatingsArr.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                onSendValue={(v) => setPrivacySetting(v)}
                fullWidth
                label="Pricavy Settings"
                error={
                  isSubmitted.in === "page1" &&
                  !privacySetting &&
                  "Privacy Settings is required"
                }
              >
                {privacySettingsArr.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                onEnteredDate={(d) => setReleaseDate(d)}
                fullWidth
                label="Release Date"
                error={
                  isSubmitted.in === "page1" &&
                  !releaseDate &&
                  "Enter Release Date"
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                fullWidth
                label="Runtime"
                onEnteredTime={(t) => setRuntime(t)}
                error={
                  isSubmitted.in === "page1" && !runtime && "Enter Runtime"
                }
              />
            </Grid>
          </Fragment>
        )}
        {!page1 && (
          <Fragment>
            <Grid item xs={12}>
              <Input
                fullWidth
                label="Director"
                name="director"
                register={register}
                validation={{ required: "Director name is required" }}
                error={hookErrors.director && hookErrors.director.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                label="Trailer Link"
                name="trailerLink"
                register={register}
                validation={{ required: "Trailer link is required" }}
                error={hookErrors.trailerLink && hookErrors.trailerLink.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TagsInput
                info="Press ENTER after each name"
                label="Cast"
                tags={cast}
                setTags={setCast}
                error={
                  isSubmitted.in === "page2" &&
                  cast.length === 0 &&
                  "Atleast one cast is required"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Genres"
                fullWidth
                onSendValue={onSendGenreValues}
                type="tag"
                error={
                  isSubmitted.in === "page2" &&
                  genres.length === 0 &&
                  "Atleast one genre is required"
                }
              >
                {genresArray.map((g) => (
                  <MenuItem key={g.id} value={g.name}>
                    {g.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <ThumbnailUploader
                onSendImage={(i) => setThumbnail(i)}
                error={
                  isSubmitted.in === "page2" &&
                  !thumbnail &&
                  "Upload a thubmnail"
                }
              />
            </Grid>
          </Fragment>
        )}
      </Grid>
    </>
  );
};

export default MovieUploaderFields;
