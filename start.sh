#!/bin/bash
cd log_pulse-api && npm run dev &
cd ../log_pulse-front && npm run dev &
wait