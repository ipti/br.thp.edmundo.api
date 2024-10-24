import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChartBffService {
  constructor(private readonly prismaService: PrismaService) {}
  async findChartClassroom(id: number) {
    try {
      const moduloActivities = await this.prismaService.$queryRaw`
           SELECT COUNT(DISTINCT ua.id) as completed_user_activities
 	            from classroom_activities ca 
 	            join activities a ON ca.activities_fk  = a.id 
 	            join user_activities ua ON ua.activities_fk = a.id 
 	            WHERE  ca.classroom_fk = ${id} and ua.status = 'COMPLETED'
        `;

      const activities_pending = await this.prismaService.$queryRaw`
SELECT COUNT(DISTINCT ua.id) as pending_user_activities
    from classroom_activities ca 
    join activities a ON ca.activities_fk  = a.id 
    join user_activities ua ON ua.activities_fk = a.id 
    WHERE  ca.classroom_fk = ${id} and ua.status = 'PENDING'
`;

      const code_activities = await this.prismaService.$queryRaw`
 SELECT COUNT(DISTINCT a.id) as code_activities
 	from classroom_activities ca 
 	join activities a ON ca.activities_fk = a.id 
 	WHERE ca.classroom_fk = ${id} and a.type_activities = 'CODE'
`;

      const quiz_activities = await this.prismaService.$queryRaw`
 SELECT COUNT(DISTINCT a.id) as quiz_activities
 	from classroom_activities ca 
 	join activities a ON ca.activities_fk = a.id 
 	WHERE ca.classroom_fk = ${id} and a.type_activities = 'QUIZ'
`;

      const media_notas = await this.prismaService.$queryRaw`
Select AVG(ua2.total) as media_notas 
from classroom_activities ca 
	join activities a ON ca.activities_fk  = a.id 
	join user_activities ua ON ua.activities_fk = a.id 
	JOIN user_avaliation ua2 ON ua2.user_activities_fk = ua.id 
	WHERE  ca.classroom_fk = ${id}
`;

      return {
        completed_user_activities: parseInt(
          moduloActivities[0].completed_user_activities,
        ),
        activities_pending: parseInt(
          activities_pending[0].pending_user_activities,
        ),
        code_activities: parseInt(code_activities[0].code_activities),
        quiz_activities: parseInt(quiz_activities[0].quiz_activities),
        media_notas: parseFloat(media_notas[0].media_notas),
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findChartClassroomUser(id: number, idUser: number) {
    try {
      const moduloActivities = await this.prismaService.$queryRaw`
           SELECT COUNT(DISTINCT ua.id) as completed_user_activities
 	            from classroom_activities ca 
               join user_classroom uc on ca.classroom_fk = uc.classroomId 
 	            join activities a ON ca.activities_fk  = a.id 
 	            join user_activities ua ON ua.user_classroomId  = uc.id 
 	            WHERE  ca.classroom_fk = ${id} and ua.status = 'COMPLETED' and uc.usersId = ${idUser}
        `;

      const activities_pending = await this.prismaService.$queryRaw`

SELECT COUNT(DISTINCT ua.id) as pending_user_activities
    from classroom_activities ca 
    join user_classroom uc on ca.classroom_fk = uc.classroomId 
    join activities a ON ca.activities_fk  = a.id 
    join user_activities ua ON ua.user_classroomId  = uc.id 
    WHERE  ca.classroom_fk = ${id} and ua.status = 'PENDING' and uc.usersId = ${idUser}
`;

      const code_activities = await this.prismaService.$queryRaw`
      
 SELECT COUNT(DISTINCT a.id) as code_activities
 	from classroom_activities ca 
 	join activities a ON ca.activities_fk = a.id 
   join user_classroom uc on ca.classroom_fk = uc.classroomId 
 	WHERE ca.classroom_fk = ${id} and a.type_activities = 'CODE' and uc.usersId = ${idUser}
`;

      const quiz_activities = await this.prismaService.$queryRaw`
 SELECT COUNT(DISTINCT a.id) as quiz_activities
 	from classroom_activities ca 
 	join activities a ON ca.activities_fk = a.id 
   join user_classroom uc on ca.classroom_fk = uc.classroomId 
 	WHERE ca.classroom_fk = ${id} and a.type_activities = 'QUIZ' and uc.usersId = ${idUser}
`;

      return {
        completed_user_activities: parseInt(
          moduloActivities[0].completed_user_activities,
        ),
        activities_pending: parseInt(
          activities_pending[0].pending_user_activities,
        ),
        code_activities: parseInt(code_activities[0].code_activities),
        quiz_activities: parseInt(quiz_activities[0].quiz_activities),
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findChartModuloClassroomUser(
    id: number,
    idUser: number,
    idModule: number,
  ) {
    try {
      const moduloActivities = await this.prismaService.$queryRaw`
          SELECT a.name, ua.total FROM user_avaliation ua 
          JOIN user_activities ua2 ON ua.user_activities_fk = ua2.id  
          JOIN activities a ON ua2.activities_fk = a.id 
          JOIN classroom_activities ca ON ca.activities_fk = a.id 
          JOIN user_classroom uc ON uc.id  = ua2.user_classroomId  
          Join classes c on c.id = a.classesId 
          JOIN module m ON c.moduleId = m.id 
          WHERE ca.classroom_fk = ${id} AND uc.usersId = ${idUser} AND m.id = ${idModule}
        `;

      return {
        moduloActivities: moduloActivities,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }




  async findChartModuloMediaClassroomUser(id: number, idUser: number) {
    try {
      const moduloActivities = await this.prismaService.$queryRaw`
        SELECT 
              m.name AS module_name,
              AVG(ua.total) AS media_avaliacao
          FROM 
              classroom_module cm
          JOIN 
              module m ON cm.module_fk  = m.id
          JOIN 
              classes c  ON m.id = c.moduleId 
          JOIN 
              activities a2 ON c.id = a2.classesId 
          JOIN 
              user_activities ua2 ON a2.id = ua2.activities_fk 
          JOIN 
              user_classroom uc ON ua2.user_classroomId  = uc.id
              JOIN 
              user_avaliation ua ON ua2.id = ua.user_activities_fk 
          WHERE 
              cm.classroom_fk = ${id} 
              AND uc.usersId  = ${idUser}     
            GROUP BY 
                m.name;
        `;

      return {
        moduloActivities: moduloActivities,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }


  async findChartMediaActivities(id: number) {
    try {
      const mediaActivitiesClassroom = await this.prismaService.$queryRaw`
       SELECT 
          a2.name AS activities_name,
          AVG(ua.total) AS media_avaliacao
      FROM 
          classroom_module cm
      JOIN 
          module m ON cm.module_fk  = m.id
      JOIN 
          classes c  ON m.id = c.moduleId 
      JOIN 
          activities a2 ON c.id = a2.classesId 
      JOIN 
          user_activities ua2 ON a2.id = ua2.activities_fk 
      JOIN 
          user_classroom uc ON ua2.user_classroomId  = uc.id
          JOIN 
          user_avaliation ua ON ua2.id = ua.user_activities_fk 
      WHERE 
          cm.classroom_fk = ${id}     
      GROUP BY 
          a2.name;
        `;

      return {
        mediaActivitiesClassroom: mediaActivitiesClassroom,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}

// SELECT COUNT(DISTINCT ua.id) as completed_user_activities
// 	from classroom_activities ca
// 	join activities a ON ca.activities_fk  = a.id
// 	join user_activities ua ON ua.activities_fk = a.id
// 	WHERE  ca.classroom_fk = 1 and ua.status = 'COMPLETED'

// SELECT COUNT(DISTINCT ua.id) as pending_user_activities
// 	from classroom_activities ca
// 	join activities a ON ca.activities_fk  = a.id
// 	join user_activities ua ON ua.activities_fk = a.id
// 	WHERE  ca.classroom_fk = 1 and ua.status = 'PENDING'

//  SELECT COUNT(DISTINCT a.id) as code_activities
//  	from classroom_activities ca
//  	join activities a ON ca.activities_fk = a.id
//  	WHERE ca.classroom_fk = 1 and a.type_activities = 'CODE'

//  SELECT COUNT(DISTINCT a.id) as quiz_activities
//  	from classroom_activities ca
//  	join activities a ON ca.activities_fk = a.id
//  	WHERE ca.classroom_fk = 1 and a.type_activities = 'QUIZ'

//  Select AVG(ua2.total) as media_notas
// from classroom_activities ca
// 	join activities a ON ca.activities_fk  = a.id
// 	join user_activities ua ON ua.activities_fk = a.id
// 	JOIN user_avaliation ua2 ON ua2.user_activities_fk = ua.id
// 	WHERE  ca.classroom_fk = 1
