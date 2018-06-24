'use strict';

import mongoose from 'mongoose';

const ChoresSchema = mongoose.Schema({
  chore: {type:String, required:true},
  assignedTo: {type:String, default:'unassigned'},
  assignedDate: {type:Date},
  timesPerWeek: {type:Number},
  completed: {type:Boolean, required:true},
});

export default mongoose.model('Chores', ChoresSchema);