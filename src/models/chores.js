'use strict';

import mongoose from 'mongoose';

const ChoresSchema = mongoose.Schema({
  chore: {type:String, required:true},
  assignedTo: {type:String, default:'unassigned'},
  completed: {type:Boolean, required:true},
  assignedDate: {type:Date},
  timesPerWeek: {type:Number},
  
});

export default mongoose.model('Chores', ChoresSchema);