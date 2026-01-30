<template>
  <div class="calendar">
    <div class="calendar-header" :style="headerStyle">
      <h2>{{ formattedToday }}</h2>
      <p>{{ selectedDateText }}</p>
    </div>
    <div class="calendar-nav">
      <button @click="prevMonth" :style="navButtonStyle">&#8249; Anterior</button>
      <span>{{ monthYearText }}</span>
      <button @click="nextMonth" :style="navButtonStyle">Próximo &#8250;</button>
    </div>
    <div class="calendar-weekdays">
      <div v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-days">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="day.classes"
        :style="day.isToday ? todayStyle : {}"
        @click="day.clickable ? selectDate(day.date) : null"
      >
        {{ day.number }}
      </div>
    </div>
    <div class="calendar-footer">
      <button @click="goToToday" :style="todayButtonStyle">Hoje</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: Object, required: true },
  },
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      months: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      daysOfWeek: [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
        'Quinta-feira', 'Sexta-feira', 'Sábado'
      ],
    };
  },
  computed: {
    primaryColor() {
      return this.content.primaryColor || '#667eea';
    },
    secondaryColor() {
      return this.content.secondaryColor || '#764ba2';
    },
    headerStyle() {
      return {
        background: `linear-gradient(135deg, ${this.primaryColor} 0%, ${this.secondaryColor} 100%)`,
      };
    },
    navButtonStyle() {
      return {
        background: this.primaryColor,
      };
    },
    todayStyle() {
      return {
        background: `linear-gradient(135deg, ${this.primaryColor} 0%, ${this.secondaryColor} 100%)`,
        color: '#fff',
        fontWeight: '600',
        boxShadow: `0 4px 15px ${this.primaryColor}66`,
      };
    },
    todayButtonStyle() {
      return {
        color: this.primaryColor,
        borderColor: this.primaryColor,
      };
    },
    formattedToday() {
      const today = new Date();
      const day = today.getDate();
      const month = this.months[today.getMonth()];
      const weekday = this.daysOfWeek[today.getDay()];
      return `${weekday}, ${day} de ${month}`;
    },
    selectedDateText() {
      if (!this.selectedDate) return 'Selecione uma data';
      const day = this.selectedDate.getDate();
      const month = this.months[this.selectedDate.getMonth()];
      const year = this.selectedDate.getFullYear();
      return `Selecionado: ${day} de ${month} de ${year}`;
    },
    monthYearText() {
      const month = this.months[this.currentDate.getMonth()];
      const year = this.currentDate.getFullYear();
      return `${month} ${year}`;
    },
    calendarDays() {
      const days = [];
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startingDay = firstDay.getDay();
      const totalDays = lastDay.getDate();
      const prevMonthLastDay = new Date(year, month, 0).getDate();

      // Dias do mês anterior
      for (let i = startingDay - 1; i >= 0; i--) {
        const dayNum = prevMonthLastDay - i;
        const dayOfWeek = (startingDay - 1 - i) % 7;
        days.push({
          number: dayNum,
          classes: {
            'other-month': true,
            'weekend': dayOfWeek === 0 || dayOfWeek === 6,
          },
          clickable: false,
          date: null,
          isToday: false,
        });
      }

      // Dias do mês atual
      for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        const isToday = this.isToday(date);
        const isSelected = this.isSelected(date);

        days.push({
          number: day,
          classes: {
            'today': isToday,
            'selected': isSelected && !isToday,
            'weekend': dayOfWeek === 0 || dayOfWeek === 6,
          },
          clickable: true,
          date: date,
          isToday: isToday,
        });
      }

      // Dias do próximo mês
      const remainingCells = 42 - days.length;
      for (let i = 1; i <= remainingCells; i++) {
        const dayOfWeek = (startingDay + totalDays + i - 1) % 7;
        days.push({
          number: i,
          classes: {
            'other-month': true,
            'weekend': dayOfWeek === 0 || dayOfWeek === 6,
          },
          clickable: false,
          date: null,
          isToday: false,
        });
      }

      return days;
    },
  },
  methods: {
    isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear();
    },
    isSelected(date) {
      if (!this.selectedDate) return false;
      return date.getDate() === this.selectedDate.getDate() &&
             date.getMonth() === this.selectedDate.getMonth() &&
             date.getFullYear() === this.selectedDate.getFullYear();
    },
    selectDate(date) {
      this.selectedDate = date;
      this.$emit('trigger', {
        name: 'dateSelected',
        event: {
          date: date.toISOString(),
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      });
    },
    prevMonth() {
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      this.currentDate = newDate;
    },
    nextMonth() {
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      this.currentDate = newDate;
    },
    goToToday() {
      const today = new Date();
      this.currentDate = today;
      this.selectDate(today);
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.calendar-header {
  color: #fff;
  padding: 25px 20px;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: capitalize;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0;
  }
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;

  button {
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      filter: brightness(0.9);
      transform: translateY(-2px);
    }
  }

  span {
    font-weight: 600;
    color: #333;
    font-size: 1.1rem;
  }
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f8f9fa;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;

  div {
    text-align: center;
    font-weight: 600;
    color: #666;
    font-size: 0.85rem;
    padding: 5px 0;
  }
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 15px;

  div {
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.95rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #333;

    &:hover:not(.other-month):not(.today) {
      background: #f0f0f0;
    }

    &.other-month {
      color: #ccc;
      cursor: default;
    }

    &.selected:not(.today) {
      background: #e8e8ff;
      color: #667eea;
      font-weight: 600;
    }

    &.weekend {
      color: #e74c3c;
    }

    &.weekend.other-month {
      color: #f5b7b1;
    }
  }
}

.calendar-footer {
  background: #f8f9fa;
  padding: 15px 20px;
  text-align: center;
  border-top: 1px solid #eee;

  button {
    background: transparent;
    border: 2px solid;
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: currentColor;
      color: #fff;
    }
  }
}

@media (max-width: 400px) {
  .calendar-nav button {
    padding: 8px 12px;
    font-size: 0.8rem;
  }

  .calendar-days div {
    font-size: 0.85rem;
  }
}
</style>
