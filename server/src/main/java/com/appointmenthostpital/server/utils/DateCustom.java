package com.appointmenthostpital.server.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateCustom {
    public static String getCurrentTimeStamp() {
        return new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(new Date());
    }
}
