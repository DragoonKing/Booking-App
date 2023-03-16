const Bookings = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");
const mongoose = require("mongoose");
const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  let existingMovie;
  let existingUser;

  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  }
  catch (err) {
    console.log(err);
  }
  if (!existingMovie) {
    return res.status(400).json({ message: "Movie not find by given id" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not find by given id" });
  }

  let booking;
  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);

    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });

    session.commitTransaction();

    booking = await booking.save();
  } catch (error) {
    console.log(error);
  }
  if (!booking) {
    return res.status(400).json({ message: "Something went wrong to create booking" });
  }
  return res.status(201).json({ Bookings: booking });
};

const getBookById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  }
  catch (error) {
    console.log(error);
  }
  if (!booking) {
    return res.status(400).json({ message: "Booking not found" });
  }
  return res.status(200).json({ Bookings: booking });
}

const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);

    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();


  }
  catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(400).json({ message: "Booking not found by given id" });
  }
  return res.status(200).json({ message: "Booking deleted" });
}

module.exports = { newBooking, getBookById, deleteBooking };
