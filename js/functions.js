const checkTimeMeeting = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const dayStartTimes = dayStart.split(':');
  const dayEndTimes = dayEnd.split(':');
  const meetingStartTimes = meetingStart.split(':');

  const dayStartMinutes = (+dayStartTimes[0] * 60 + (+dayStartTimes[1]));
  const dayEndMinutes = (+dayEndTimes[0] * 60 + (+dayEndTimes[1]));
  const meetingStartMinutes = (+meetingStartTimes[0] * 60 + (+meetingStartTimes[1]));

  if (dayStartMinutes <= meetingStartMinutes && meetingStartMinutes + meetingDuration <= dayEndMinutes) {
    return true;
  } return false;
};

checkTimeMeeting('08:00', '17:30', '14:00', 90);
checkTimeMeeting('8:0', '10:0', '8:0', 120);
checkTimeMeeting('08:00', '14:30', '14:00', 90);
checkTimeMeeting('14:00', '17:30', '08:0', 90);
checkTimeMeeting('8:00', '17:30', '08:00', 900);
