model ServerHealth {
  environment: string;
  status: string;
  uptime: string;
  timestamp: unixTimestamp32;
}

model DatabaseHealth {
  database: string;
  status: string;
  timestamp: unixTimestamp32;
}
