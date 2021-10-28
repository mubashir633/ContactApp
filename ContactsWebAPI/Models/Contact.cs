using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsWebAPI.Models
{
    public class Contact
    {

        public int? contactId { get; set; }

        public string contactFirstName { get; set; }

        public string contactLastName { get; set; }

        public string contactEmailAddress { get; set; }
    }
}
