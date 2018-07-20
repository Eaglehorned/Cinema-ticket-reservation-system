using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using System.Globalization;

namespace Nadim.CinemaReservationSystem.Web
{
    public static class Utils
    {
        public static string GetHash(string input)
        {
            using (SHA1Managed sha1 = new SHA1Managed())
            {
                var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sb = new StringBuilder(hash.Length * 2);

                foreach (byte b in hash)
                {
                    sb.Append(b.ToString("X2"));
                }

                return sb.ToString();
            }
        }
        public static DateTime FromUTCStringToDateTime(string timeString)
        {
            if (timeString.Contains("UTC"))
            {
                timeString = timeString.Replace("UTC", "GMT");
            }
            return DateTime.ParseExact(timeString, "ddd, dd MMM yyyy HH:mm:ss Z", CultureInfo.InvariantCulture);
        }
    }
}
