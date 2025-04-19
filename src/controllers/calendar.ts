interface CalendarDate {
    day: number;
    isCurrentMonth: boolean;
  }
  
  class Calendar {
    private currentDate: Date;
    private calendarTitle: HTMLElement;
    private calendarBody: HTMLElement;
  
    constructor() {
      this.currentDate = new Date();
      this.calendarTitle = document.getElementById('calendar-title')!;
      this.calendarBody = document.getElementById('calendar-body')!;
      
      this.renderCalendar();
      this.addEventListeners();
    }
  
    // Render the calendar for the current month
    private renderCalendar() {
      const month = this.currentDate.getMonth(); // Current month (0-11)
      const year = this.currentDate.getFullYear(); // Current year
  
      // Set the title of the calendar (e.g. "April 2025")
      this.calendarTitle.textContent = `${this.getMonthName(month)} ${year}`;
  
      // Get the first day of the month and the number of days in the month
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
  
      // Prepare an array of dates to display
      const days: CalendarDate[] = [];
      
      // Fill in empty days before the start of the month (starts on Monday, not Sunday)
      const startDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust to start from Monday
      for (let i = 0; i < startDay; i++) {
        days.push({ day: 0, isCurrentMonth: false }); // Empty days
      }
  
      // Add the actual days of the month
      for (let day = 1; day <= lastDate; day++) {
        days.push({ day, isCurrentMonth: true });
      }
  
      // Clear the existing calendar body
      this.calendarBody.innerHTML = '';
  
      // Add the days of the week labels (Monday to Sunday)
      const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      dayNames.forEach(dayName => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day-name');
        dayElement.textContent = dayName;
        this.calendarBody.appendChild(dayElement);
      });
  
      // Add the days of the month to the calendar
      days.forEach(({ day, isCurrentMonth }) => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
  
        if (day === 0) {
          dayElement.textContent = '';
        } else {
          dayElement.textContent = day.toString();
          if (!isCurrentMonth) {
            dayElement.style.opacity = '0.5'; // Dim non-current month days
          }
        }
  
        this.calendarBody.appendChild(dayElement);
      });
    }
  
    // Handle the previous and next month buttons
    private addEventListeners() {
      const prevButton = document.getElementById('prev-month')!;
      const nextButton = document.getElementById('next-month')!;
  
      prevButton.addEventListener('click', () => this.changeMonth(-1));
      nextButton.addEventListener('click', () => this.changeMonth(1));
    }
  
    // Change the current month by 1 (forward or backward)
    private changeMonth(offset: number) {
      this.currentDate.setMonth(this.currentDate.getMonth() + offset);
      this.renderCalendar();
    }
  
    // Get the month name (e.g., "January", "February", etc.)
    private getMonthName(month: number): string {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return months[month];
    }
  }
  
  // Initialize the calendar
  new Calendar();
  