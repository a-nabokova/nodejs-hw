import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { TAGS } from '../constants/tags';


const noteSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: false,
      default: "",
    },
    tag: {
      type: String,
      enum: TAGS,
      required: false,
      default: "Todo",
    }
  },
  {
    timestamps: true
  },
);


noteSchema.index(
  { title: "text", content: "text" }
);


export const Note = model('Note', noteSchema);
