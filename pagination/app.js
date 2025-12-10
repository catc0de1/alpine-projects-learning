function paginationComponent() {
  return {
    members: [],

    filteredMembers: [],

    perPage: 6,

    currentPage: 1,

    searchQuery: '',

    get totalPages() {
      return Math.ceil(this.filteredMembers.length / this.perPage);
    },

    get totalPagesArray() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },

    get paginatedMembers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.filteredMembers.slice(start, end);
    },

    changePage(page) {
      this.currentPage = page;
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    searchMembers() {
      this.filteredMembers = this.members.filter((member) => {
        const fullName = member.name.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });

      this.currentPage = 1;
    },

    async fetchMembers() {
      const response = await fetch('https://randomuser.me/api/?results=60');
      const data = await response.json();
      this.members = data.results.map((member) => ({
        name: `${member.name.first} ${member.name.last}`,
        age: member.dob.age,
        gender: member.gender,
        address: `${member.location.city}, ${member.location.country}`,
        avatar: member.picture.large,
      }));

      this.filteredMembers = this.members;
    },

    init() {
      this.fetchMembers();
    }
  };
}
