const db = require('../database/db');

const jobController = {
  createJob: async (req, res) => {
    try {
      const {
        companyName,
        companyFunction,
        companyLocation,
        salary,
        companyLogo,
        description,
        requirements,
        benefits
      } = req.body;
      const userId = req.user.id;

      const sql = `
        INSERT INTO jobs (
          company_name,
          company_function,
          company_location,
          salary,
          company_logo,
          description,
          requirements,
          benefits,
          user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        companyName,
        companyFunction,
        companyLocation,
        salary,
        companyLogo,
        description,
        requirements,
        benefits,
        userId
      ];

      const result = await db.run(sql, params);

      res.json({
        success: true,
        message: 'Vaga cadastrada com sucesso',
        jobId: result.lastID
      });
    } catch (error) {
      console.error('Erro ao cadastrar vaga:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao cadastrar vaga'
      });
    }
  },

  getJobs: async (req, res) => {
    try {
      const sql = `
        SELECT 
          j.*,
          u.name as user_name,
          u.avatar as user_avatar
        FROM jobs j
        JOIN users u ON j.user_id = u.id
        ORDER BY j.created_at DESC
      `;

      const jobs = await db.all(sql);

      res.json({
        success: true,
        jobs: jobs.map(job => ({
          id: job.id,
          companyName: job.company_name,
          companyFunction: job.company_function,
          companyLocation: job.company_location,
          salary: job.salary,
          companyLogo: job.company_logo,
          description: job.description,
          requirements: job.requirements,
          benefits: job.benefits,
          userId: job.user_id,
          userName: job.user_name,
          userAvatar: job.user_avatar,
          createdAt: job.created_at
        }))
      });
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar vagas'
      });
    }
  },

  getJobById: async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `
        SELECT 
          j.*,
          u.name as user_name,
          u.avatar as user_avatar
        FROM jobs j
        JOIN users u ON j.user_id = u.id
        WHERE j.id = ?
      `;

      const job = await db.get(sql, [id]);

      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Vaga não encontrada'
        });
      }

      res.json({
        success: true,
        job: {
          id: job.id,
          companyName: job.company_name,
          companyFunction: job.company_function,
          companyLocation: job.company_location,
          salary: job.salary,
          companyLogo: job.company_logo,
          description: job.description,
          requirements: job.requirements,
          benefits: job.benefits,
          userId: job.user_id,
          userName: job.user_name,
          userAvatar: job.user_avatar,
          createdAt: job.created_at
        }
      });
    } catch (error) {
      console.error('Erro ao buscar vaga:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar vaga'
      });
    }
  },

  updateJob: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const {
        companyName,
        companyFunction,
        companyLocation,
        salary,
        companyLogo,
        description,
        requirements,
        benefits
      } = req.body;

      const sql = `
        UPDATE jobs 
        SET 
          company_name = ?,
          company_function = ?,
          company_location = ?,
          salary = ?,
          company_logo = ?,
          description = ?,
          requirements = ?,
          benefits = ?
        WHERE id = ? AND user_id = ?
      `;

      const params = [
        companyName,
        companyFunction,
        companyLocation,
        salary,
        companyLogo,
        description,
        requirements,
        benefits,
        id,
        userId
      ];

      const result = await db.run(sql, params);

      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Vaga não encontrada ou não autorizada'
        });
      }

      res.json({
        success: true,
        message: 'Vaga atualizada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar vaga'
      });
    }
  },

  deleteJob: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const sql = 'DELETE FROM jobs WHERE id = ? AND user_id = ?';
      const result = await db.run(sql, [id, userId]);

      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Vaga não encontrada ou não autorizada'
        });
      }

      res.json({
        success: true,
        message: 'Vaga excluída com sucesso'
      });
    } catch (error) {
      console.error('Erro ao excluir vaga:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir vaga'
      });
    }
  }
};

module.exports = jobController; 