import { createError } from '../error.js';
import User from '../models/User.js';
import Podcasts from '../models/Podcasts.js';

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can update only your account!'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'podcasts',
        populate: {
          path: 'creator',
          select: 'name img',
        },
      })
      .populate({
        path: 'favorits',
        populate: {
          path: 'creator',
          select: 'name img',
        },
      });
    res.status(200).json(user);
  } catch (err) {
    console.log(req.user);
    next(err);
  }
};

export const recommend = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'favorits',
    });
    const relevantSongs = await Podcasts.find({
      category: { $in: user.favorits.map((fav) => fav.category) },
      _id: { $nin: user.favorits.map((fav) => fav._id) },
    });
    res.status(200).json(relevantSongs);
  } catch (err) {
    next(err);
  }
};
