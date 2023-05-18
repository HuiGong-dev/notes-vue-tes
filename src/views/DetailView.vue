<template>
  <div class="container">
    <h1>Hey, {{ username }}</h1>
    <FormComponent
      @form-submitted="handleFormSubmit"
      @note-updated="handleNoteUpdate"
      :formData="formDataByEdit"
    />
    <div :key="note.id" v-for="note in notes">
      <NoteItem :note="note" @editNote="handleEditNote" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormComponent from '../components/FormComponent.vue';
import NoteItem from '../components/NoteItem.vue';
import { NoteData } from '@/types/types';

export default defineComponent({
  name: 'DetailPage',
  mounted() {
    if (!localStorage.getItem('isLoggedIn')) {
      this.$router.push('/login');
    }
  },
  computed: {
    username(): string {
      return this.$route.params.username as string;
    },
  },

  data() {
    return {
      notes: [] as NoteData[],
      formDataByEdit: {} as NoteData,
    };
  },
  components: {
    FormComponent,
    NoteItem,
  },
  methods: {
    handleFormSubmit(formData: NoteData): void {
      this.notes = [...this.notes, formData];
    },
    handleEditNote(noteData: NoteData): void {
      this.formDataByEdit = noteData;
    },
    handleNoteUpdate(updatedNote: NoteData): void {
      this.notes = this.notes.map((note) => {
        if (note.id === updatedNote.id) {
          note.text = updatedNote.text;
          note.title = updatedNote.title;
          note.date = updatedNote.date;
        }
        return note;
      });
      this.formDataByEdit = {} as NoteData;
    },
  },
});
</script>
