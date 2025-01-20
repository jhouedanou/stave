
<template>
  <v-container>
    <v-card>
      <v-card-title>
        Administration du Quiz
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="participants"
        :search="search"
        :items-per-page="10"
      >
        <template v-slot:item.eligible="{ item }">
          <v-chip
            :color="item.eligible ? 'success' : 'error'"
          >
            {{ item.eligible ? 'Éligible' : 'Non éligible' }}
          </v-chip>
        </template>
      </v-data-table>
      
      <v-btn
        color="primary"
        @click="exportData"
      >
        Exporter les données
      </v-btn>
    </v-card>
  </v-container>
</template>
